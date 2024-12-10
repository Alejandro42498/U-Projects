'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Relación con el modelo `Cart`
            Product.hasMany(models.Cart, {
                foreignKey: 'productId',
                as: 'cartItems',
            });
        }

    
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );
    return Product;
};
