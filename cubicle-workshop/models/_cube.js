// Rewrite Cube model

const fs = require('fs');
const path = require('path');

class CubeModel {

    constructor() {
        this.data = require('../config/database');
    }

    getOne(id) {
        return Promise.resolve(this.data.entities.find( cube => cube.id === id));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }

    create(name, description, imageUrl, difficultyLevel) {
        return { name, description, imageUrl, difficultyLevel };
    }

    insert(newCube) {
        const newIndex = ++this.data.lastIndex;
        newCube = {
            id: newIndex,
            ...newCube
        };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newCube)
        }

        return this._writeInDB(newData, newCube);
    }

    update(id, updates) {
        const entityIndex = this.data.entities.findIndex(cube => cube.id === id);
        const entity = this.data.entities[entityIndex];
        const updatedEntity = { ...entity, ...updatedEntity };

        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [
                ...this.data.entities.slice(0, entityIndex),
                entity,
                ...this.data.entities.slice(entityIndex + 1)
            ]
        };

        return this._writeInDB(newData, updatedEnttity);
    }

    delete(id) {
        const deletedEntity = this.getOne(id);
 
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(cube => cube.id !== id)
        };

        return this._writeInDB(newData, deletedEntity);
    }

    _writeInDB(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve('config/database.json'), 
                JSON.stringify(newData, null, 4), 
                (err) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    this.data = newData;

                    resolve(resolveData);
                });
        })
    }

}

module.exports = new CubeModel();
