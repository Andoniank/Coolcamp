class User < ApplicationRecord
  has_secure_password
    validates :email, 
      uniqueness: true, 
      length: { in: 3..255 }, 
      format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user&.authenticate(password)
    end
  
    def reset_session_token!
      self.update!(session_token: generate_unique_session_token)
      self.session_token
    end
  
    private
  
    def generate_unique_session_token
      while true
          session_token = SecureRandom.urlsafe_base64
          return session_token unless User.exists?(session_token: session_token)
      end
    end
  
    def ensure_session_token
      self.session_token ||= generate_unique_session_token
    end
  end
