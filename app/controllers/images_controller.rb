class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def show
    @image = Image.find( params[:id] )
  end

  def create
    image = Image.new
    image.image = params[:image]
    image.save!

    render nothing: true, status: :created
  end
end
