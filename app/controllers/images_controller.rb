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

  def flag
    image = Image.find( params[:id] )
    image.flag_count = image.flag_count + 1
    image.save

    redirect_to image
  end
end
