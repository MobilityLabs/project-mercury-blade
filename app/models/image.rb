class Image < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  validates :image, file_size: {less_than_or_equal_to: 20.megabytes}
end
