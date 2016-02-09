class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def show
    @image = Image.find_by!( uuid: params[:uuid] )
  end

  def create
    image = Image.new
    image.image = params[:image]
    image.uuid = SecureRandom.uuid
    image.save!

    render json: {link: image_url( image.uuid )}, status: :created
  end

  def flag
    image = Image.find_by!( uuid: params[:uuid] )
    image.flag_count = image.flag_count + 1
    image.save

    redirect_to image
  end
end
