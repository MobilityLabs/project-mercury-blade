require "acts_as_commentable_with_threading"

class Image < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  validates :image, file_size: {less_than_or_equal_to: 20.megabytes}

  acts_as_commentable

  def hierarchical_comments
    BrianSpeak.translate( self.comment_threads ).as_json
  end

private

  # transforms an array of objects with "id" and "parent_id" into a tree
  def make_tree(array, pid=nil)
    array.select{ |n|
      n["parent_id"] == pid
    }.map{ |n|
      n.merge( children: make_tree( array, n["id"] ) )
    }
  end
end
