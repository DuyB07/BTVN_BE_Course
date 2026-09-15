import * as userService from '../services/user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const { active } = req.query;
    const users = await userService.getUsers({ active });
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { fullName, email, role, password } = req.body;
    const newUser = await userService.createUser({ fullName, email, role, password });
    return res.status(201).json({
      success: true,
      message: 'Tạo tài khoản thành công',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};