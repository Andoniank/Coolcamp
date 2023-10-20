class Api::ReviewsController < ApplicationController
  def show
    @review = Review.find_by(id: params[:id])
    render :show
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show 
    else
      render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find_by(id: params[:id])
    @review.destroy
      render :show
  end

  def update
    @review = Review.find_by(id: params[:id])
    if @review.update(review_params)
      render :show
    else
      render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
    end
  end


  private
  def review_params
    params.require(:review).permit(:recommend, :description, :user_id, :campsite_id)
  end
    
end
