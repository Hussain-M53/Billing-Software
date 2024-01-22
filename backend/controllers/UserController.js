const db = require("../models/index.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserRepository = require('../repositories/UserRepository.js')
const User = db.User;
const Role = db.Role;
const userResource = require('../resources/UserResource.js');
const UserCollection = require('../resources/collections/UserCollection.js');
const UserType = require('../enums/UserType');
const Paging = require('../helpers/Paging')
const {Op, literal} = require("sequelize");
const func = require('../middleware/permissions/CommonFunc')

module.exports = {
    async create(req, res) {
        let response = null;
        const {username, name, email, password, role_id} = req.body;
        const role = Role.findByPk(role_id);
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await (new UserRepository(User)).create({
            username: username,
            email: email,
            name: name,
            password: encryptedPassword,
            role_id: role_id,
            created_by: req.query.user_id,
            type: role.key
        });
        response = res.status(201).json({message: 'User created successfully.', user: await userResource(user)});
        return response;
    },

    async login(req, res) {
        const {username, password} = req.body;
        if (!(username && password)) {
            return res.status(400).json({'message': 'Email or password field is empty.'});
        }
        
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        console.log('user',user)
        if (user && (await bcrypt.compare(password, user.password))) {
            user.token = getToken(user, user.email);
            await user.save();
            return res.status(200).json({user: await userResource(user), token: user.token});
        }
        return res.status(403).json({'msg': 'Credentials do not match our records.'});
    },
    async changePassword(req, res) {
        const {password} = req.body;
        let user = req.user;
        user = await User.findByPk(user.user_id);
        user = await (new UserRepository(user)).update({password: await bcrypt.hash(password, 10)})
        return res.status(200).json({user: await userResource(user)});
    },

    async update(req, res) {
        let {password, name, username, email, role_id} = req.body;
        const id = req.params.id;
        let user = await User.findByPk(id);
        let authUser = req.user;
        authUser = await User.findOne({
            where: {
                id: req.query.user_id,
            }
        })
        if (password != null && password !=='') {
            // if password is not empty then change
            password = await bcrypt.hash(password, 10)
        }else{
            // else retain old password
            password = authUser.password;
        }
        let type = user.type;
        let role = await Role.findByPk(role_id)
        if (role) {
            console.log("ROle " + role.key)
            type = role.key;
        }
        if (user) {
            user = await (new UserRepository(user)).update({
                password: password,
                name: name,
                email: email,
                username: username,
                role_id: role_id,
                type: type,
                updated_by: req.user.user_id,

            })
            return res.status(201).json({message : "User updated successfully", user: await userResource(user)})
        } else {
            return res.status(404).json({'message': 'User not found'})
        }
    },
    async profileUpdate(req, res) {
        let {name, username, email} = req.body;
        let authUser = req.query;
        authUser = await User.findByPk(authUser.user_id)
        if (authUser) {
            authUser = await (new UserRepository(authUser)).update({
                name: name,
                email: email,
                username: username,
            })
            return res.status(200).json({user: await userResource(authUser)})
        } else {
            return res.status(404).json({'message': 'User not found'})
        }
    },
    async profile(req, res) {
        let user = req.user;
        user = await User.findOne({
            where: {
                username: user.username
            }
        })
        let response = null;
        if (user) {
            response = res.status(200).json({user: await userResource(user)});
        } else {
            response = res.status(401).json({'message': 'Unauthorized access'});
        }
        return response;
    }
    ,
    async user(req, res) {
        const id = req.params.id;
        let user = await User.findByPk(id)
        let response = null;
        if (user) {
            response = res.status(200).json({user: await userResource(user)});
        } else {
            response = res.status(401).json({'message': 'User not found'});
        }
        return response;
    }
    ,
    async users(req, res) {
        const {size, currentPage, search, sortBy, orderBy} = req.query;
        const {limit, offset} = Paging.getPagination(currentPage, size);
        let condition = {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    email: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    username: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
        let order = [
            ['id', 'ASC']
        ];
        if (sortBy) {
            order = [[sortBy, orderBy]]
        }

        const isSuper = await func.isSuperUser(req.query.user_id);
        // only show super users if logged in by super user
        if (!isSuper){
            condition = Object.assign(
                {
                    [Op.and]:literal('role_id not in (Select id from roles where roles.[key]= :superKey) and id !=1'),
                },condition);    
            
        }else{
            condition = Object.assign(
                {
                    [Op.and]:literal('id !=1'),
                },condition);    
           
        }

        await User.findAndCountAll({
            where: condition,
            order: order,
            limit,
            offset,
            replacements:{
                superKey:'@super_user',
            },
        })
            .then(async data => {
                const users = await UserCollection(data.rows);
                console.log(users)
                const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                res.status(200).json({users:users, pagination : pagination});
            });
    }
    ,
    async destroy(req, res) {
        let id = req.params.id;
        let response = null;

        if (id == req.query.user_id) // cannot delete logged in user
        {
            response= res.status(409).json({message: 'Cannot delete logged in user'});
        }
        else if (id == '1') // cannot delete super user - main
        {
            response= res.status(409).json({message: 'Unauthorized action'});
        }else{
            User.destroy({
                where: {
                    id: id
                }
            })
            response = res.status(200).json({message: 'User deleted successfully.'});
        }
        return response;

    }
}
const getToken = (user, email) => {
    let {username, password} = user;
    console.log(user)
    return jwt.sign(
        {user_id: user.id, email, username, password},
        process.env.TOKEN_KEY,
        {
            expiresIn: "10h",
        }
    );
}

