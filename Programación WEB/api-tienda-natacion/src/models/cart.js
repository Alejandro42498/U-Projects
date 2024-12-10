'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Relación con el modelo `Product`
            Cart.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product',
            });

            // Relación con el modelo `User`
            Cart.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
        }
    }
    Cart.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: 'Cart',
        }
    );
    return Cart;
};
