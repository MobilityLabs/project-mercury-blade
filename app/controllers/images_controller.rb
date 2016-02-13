class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def home
  end

  def show
    @image = Image.find_by!( uuid: params[:uuid] )
  end

  def create
    image = Image.new
    image.image = params[:image]
    image.uuid = SecureRandom.uuid
    image.save!

    respond_to do |format|
      format.js do
        render json: {link: image_url( image.uuid )}, status: :created
      end
      format.html do
        redirect_to image_url( image.uuid )
      end
    end
  end

  def flag
    image = Image.find_by!( uuid: params[:uuid] )
    image.flag_count = image.flag_count + 1
    image.save

    redirect_to image
  end

  def add_comment
    image = Image.find_by!( uuid: params[:uuid] )

    comment = Comment.create!(
      commentable: image,
      body: comment_params[:body],
      username: comment_params[:username],
      parent_id: comment_params[:parent_id],
      # FIXME: remove the below 2 lines when Jason updates the gem
      commentator_id: 0,
      commentator_type: ""
    )

    render json: { comment: BrianSpeak.as_brian_comment(comment) }, status: :created
  end

private

  def comment_params
    params.require( :comment ).permit( :body, :username, :parent_id )
  end
end
