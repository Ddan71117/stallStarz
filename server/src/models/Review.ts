import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface ReviewAttributes {
  id: string;
  userId: string;
  restroomId: string;
  createdAt?: Date;
  title: string;
  content: string;
}

interface ReviewCreationAttributes extends Omit<ReviewAttributes, 'id'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  public id!: string;
  public userId!: string;
  public restroomId!: string;
  public readonly createdAt!: Date;
  public title!: string;
  public content!: string;


}
Review.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    restroomId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 64],
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 1200],
        },
    },
}, {
    sequelize, 
    modelName: 'Review',
    tableName: 'Reviews',

});
export default Review;