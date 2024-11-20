import { sequelize } from '../libs/sequelize.js';


async function index (){
console.log('INDEX /api/v1/tasks');
const tasks = await sequelize.models.task.findAll();
return tasks
}

async function create (task){ 
    const newTask = await sequelize.models.task.create({ title : task.title})                                
    
    return newTask;
}

async function show (id){ 
    console.log('SHOW /api/v1/tasks');
    const task = await sequelize.models.task.findByPk(id);
    return task
}   

async function update (id, task){ 
    console.log('update /api/v1/tasks');
    const searchTask = await sequelize.models.task.findByPk(id);
    if (!searchTask) {
        return false;
    }
    const [rowsAffected, [updatedTask]] = await sequelize.models.task.update ({title: task.title}, 
        {where: {id},
        returning : true
})
return updatedTask
}   

async function destroy (){ 
    console.log('DESTROY /api/v1/tasks');
    const task = await sequelize.models.task.destroy({where: {id}});
    return task
}   

export {index, create, show, update, destroy};  
