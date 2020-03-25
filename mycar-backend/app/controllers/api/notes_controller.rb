module Api
    class NotesController < ApplicationController
        before_action :set_task
        before_action :set_task_note, only: [:show, :update, :destroy]
        def index
            @notes = @task.notes.all
            render json: {status: 'SUCCESS', message:'Loaded Notes', data:@notes},status: :ok
        end
       
        def create
            @note = @task.notes.create(note_params)
            if @note.save
              render json: {status: 'SUCCESS', message:'Saved Note', data:@note},status: :ok
            else
              render json: {status: 'ERROR', message:'Note not saved', data:@note.errors},status: :unprocessable_entity
            end
        end
        private

        def note_params
        params.permit(:requirement)
        end

        def set_task
            @task = Task.find(params[:task_id])
        end

        def set_car_task
            @note = @task.notes.find_by!(id: params[:id]) if @task
        end
    end
end