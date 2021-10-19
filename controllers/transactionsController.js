const { Users, Limits, Safes, Transactions, Categories } = require('../models')
const Joi = require('joi')

module.exports = {
    postTransaction: async(req, res) => {
        const user = req.user;
        const body = req.body;

        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                limit_id: Joi.number().required(),
                safe_id: Joi.number().required(),
                detailExpense: Joi.string().required(),
                expense: Joi.number().required()
            });

            const { error } = schema.validate({
                user_id: user.id,
                limit_id: body.limit_id,
                safe_id: body.safe_id,
                detailExpense: body.detailExpense,
                expense: body.expense
            }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Bad Request',
                    errors: error['details'][0]['message']
                });
            }

            const safe = await Safes.findOne({
                where: {
                    id: body.safe_id
                },
                include: {
                    model: Users,
                    as: 'user'
                }
            })
            console.log("🚀 ~ file: transactionsController.js ~ line 43 ~ postTransaction:async ~ safe", safe)

            if (!safe) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Safe not found'
                })
            }
            if (safe.user.dataValues.id != user.id) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'You are not authorized to do this action'
                })
            }

            if (safe.length == 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Please create safe first'
                });
            }

            const limit = await Limits.findOne({
                where: {
                    id: body.limit_id
                },
                include: {
                    model: Users,
                    as: 'User'
                }
            });

            if (!limit) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Limit not found'
                })
            }
            if (limit.User.id != user.id) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'You are not authorized to do this action'
                })
            }

            if (limit.length == 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Please create limits first'
                });
            }

            const create = await Transactions.create({
                user_id: user.id,
                limit_id: body.limit_id,
                safe_id: body.safe_id,
                detailExpense: body.detailExpense,
                expense: body.expense
            });

            if (!create) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Unable to save data to database'
                });
            }

            const credit = await Transactions.findAll({
                where: {
                    user_id: user.id
                }
            });

            let allCredit = credit.map(e => {
                return e.dataValues.expense
            });

            const sum = allCredit.reduce((a, b) => a + b)

            const newSafe = safe.amount - sum

            const updateSafe = await Safes.update({
                amount: newSafe
            }, {
                where: {
                    user_id: user.id
                }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Successfully saved data to database',
                data: { create }
            });
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    getAllTransaction: async(req, res) => {
        const user = req.user;

        try {
            const transactions = await Transactions.findAll({
                where: { user_id: user.id },
                include: [{
                        model: Limits,
                        include: {
                            model: Categories
                        }
                    },
                    {
                        model: Safes
                    }
                ]
            });

            if (transactions.length == 0) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Data not found'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data transactions',
                data: {
                    transactions
                }
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    },

    updateTransaction: async(req, res) => {
        const user = req.user;

        try {
            const schema = Joi.object({
                limit_id: Joi.number(),
                safe_id: Joi.number(),
                detailExpense: Joi.string(),
                expense: Joi.number()
            });

            const { error } = schema.validate({
                user_id: user.id,
                limit_id: body.limit_id,
                safe_id: body.safe_id,
                detailExpense: body.detailExpense,
                expense: body.expense
            }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                });
            }

            const updateTransaction = await Transactions.update({...body }, { where: { user_id: user.id } });

            if (!updateTransaction[0]) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Unable to update transaction'
                });
            }

            const data = await Transactions.findOne({
                where: { user_id: user.id }
            });

            return res.status(200).json({
                status: 'success',
                message: 'Successfully retrieved data transactions',
                data: {
                    data
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            });
        }
    },

    deleteTransaction: async(req, res) => {
        const user = req.user;
        const id = req.params.id;

        try {
            const check = await Transactions.destroy({
                where: {
                    user_id: user.id,
                    id: id
                }
            });

            if (!check) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to delete the data",
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            });
        }
    }
}