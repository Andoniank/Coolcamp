class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all
      render :index
  end

  def show
    @reservation = Reservation.find_by(id: params[:id])
      render :show
  end

  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render :show
    else
      render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])
    @reservation.destroy
      render :show
  end

  def update
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation.update(reservation_params)
      render :show
    else
      render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(:start_date, :end_date, :user_id, :campsite_id)
  end
end
