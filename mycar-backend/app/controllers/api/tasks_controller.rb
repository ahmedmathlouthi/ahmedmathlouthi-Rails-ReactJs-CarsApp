module Api
    class TasksController < ApplicationController
        before_action :set_car
        before_action :set_car_task, only: [:show, :update, :destroy]

        def index
            @tasks = @car.tasks.all
            render json: {status: 'SUCCESS', message:'Loaded tasks', data:@tasks },status: :ok, :include => {:notes => {:only=> :requirement}}
        end
        
        def show
            task = Task.find(params[:id])
            render json: {status: 'SUCCESS', message:'Loaded task', data:task},status: :ok
        end

        def create
            @task = @car.tasks.create(task_params)
            if @task.save
                render json: {status: 'SUCCESS', message:'Saved task', data:@task},status: :ok
            else
                render json: {status: 'ERROR', message:'task not saved', data:@task.errors},status: :unprocessable_entity
            end
        end

        def destroy
            @task = Task.find(params[:id])
            @task.destroy
            render json: {status: 'SUCCESS', message:'Deleted task', data:@task},status: :ok
        end
    
        def update
            @task = Task.find(params[:id])
            if @task.update_attributes(task_params)
                @task.save
                render json: {status: 'SUCCESS', message:'Updated task', data:@task },status: :ok
            else
                render json: {status: 'ERROR', message:'task not updated', data:@task .errors},status: :unprocessable_entity
            end
        end
        
        private

        def task_params
            params.permit(:issue, :status, notes_attributes: [:id, :requirement ])
        end

        def set_car
            @car = Car.find(params[:car_id])
        end

        def set_car_task
            @task = @car.tasks.find_by!(id: params[:id]) if @car
        end

        
    end
end