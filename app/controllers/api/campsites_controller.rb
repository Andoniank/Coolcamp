class Api::CampsitesController < ApplicationController
  def show
    @campsite = Campsite.find_by(id: params[:id])
      render :show
  end

  def index
    @campsites = Campsite.all 
      render :index
  end
end
