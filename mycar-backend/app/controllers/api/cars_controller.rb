module Api
    class CarsController < ApplicationController
        def index
            @cars = Car.order('created_at DESC');
            render json: {status: 'SUCCESS', message:'Loaded cars', data:@cars},status: :ok
        end
        def show
            @car = Car.find(params[:id])
            render json: {status: 'SUCCESS', message:'Loaded car', data:@car},status: :ok
        end
        def create
            @car = Car.new(car_params)
            if @car.save
              render json: {status: 'SUCCESS', message:'Saved car', data:@car},status: :ok
            else
              render json: {status: 'ERROR', message:'car not saved', data:@car.errors},status: :unprocessable_entity
            end
        end
    
        def destroy
        @car = Car.find(params[:id])
        @car.destroy
        render json: {status: 'SUCCESS', message:'Deleted car', data:@car},status: :ok
        end

        private

      def car_params
        params.permit(:vin, :model, :color, :mileage, :purchased_date)
      end
    
    end
end