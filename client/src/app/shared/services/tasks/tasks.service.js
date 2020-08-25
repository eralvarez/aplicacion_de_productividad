import axios from 'axios';
import { Subject } from 'rxjs';


class TasksService {
    createTaskSubject = new Subject();
    selectTaskSubject = new Subject();
    editTaskSubject = new Subject();
    finishTaskSubject = new Subject();

    getSelectTaskSubject() {
        if (this.selectTaskSubject.isStopped) {
            this.selectTaskSubject = new Subject();
        }

        return this.selectTaskSubject;
    }

    getCreateTaskSubject() {
        if (this.createTaskSubject.isStopped) {
            this.createTaskSubject = new Subject();
        }

        return this.createTaskSubject;
    }

    getEditTaskSubject() {
        if (this.editTaskSubject.isStopped) {
            this.editTaskSubject = new Subject();
        }

        return this.editTaskSubject;
    }

    getFinishTaskSubject() {
        if (this.finishTaskSubject.isStopped) {
            this.finishTaskSubject = new Subject();
        }

        return this.finishTaskSubject;
    }

    async getAll() {
        let response = [];
        try {
            const requestResponse = await axios.get('http://localhost:4201/api/v1/tasks');
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }

    async getAllFinished() {
        let response = [];
        try {
            const requestResponse = await axios.get('http://localhost:4201/api/v1/finished/tasks');
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }

    async create(task) {
        let response;
        try {
            const requestResponse = await axios.post(`http://localhost:4201/api/v1/tasks`, task);
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }

    async finish(taskId, form) {
        let response;
        try {
            const requestResponse = await axios.put(`http://localhost:4201/api/v1/tasks/finish/${taskId}`, form);
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }

    async update(taskId, form) {
        let response;
        try {
            const requestResponse = await axios.put(`http://localhost:4201/api/v1/tasks/${taskId}`, form);
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }

    async delete(taskId) {
        let response;
        try {
            const requestResponse = await axios.delete(`http://localhost:4201/api/v1/tasks/${taskId}`);
            response = requestResponse.data;
        } catch (error) {
            console.error(error);
        } finally {
            return response;
        }
    }
}

export default new TasksService();