class BrianSpeak
  class << self
    def translate(comments)
      comments.map do |comment|
        as_brian_comment(comment)
      end
    end

    def as_brian_comment(comment)
      translated_comment = comment.as_json.merge(
        author: comment[:username],
        content: comment[:body]
      )
      translated_comment.delete( :username )
      translated_comment.delete( :body )

      translated_comment
    end
  end
end
