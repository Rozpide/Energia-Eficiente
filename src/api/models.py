from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    profile_photo_id = db.Column(db.Integer, db.ForeignKey('Profile_Photo.id'))
    profile_photo = db.relationship('Profile_Photo', backref='user', uselist=False)

    saved_artist = db.relationship('Saved_Artist', backref='user')
    saved_music = db.relationship('Saved_Music', backref='user')

    followed_artists = db.relationship('Follow_Artist', backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "saved_artist": [saved.serialize() for saved in self.saved_artist],
            "saved_music": [saved.serialize() for saved in self.saved_music],
        }
    
class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    profile_photo_id = db.Column(db.Integer, db.ForeignKey('Profile_Photo.id'))
    profile_photo = db.relationship('Profile_Photo', backref='artist', uselist=False)

    artist_bio = db.relationship("Photo", backref="artist")
    artist_photos = db.relationship("Photo", backref="artist")
    artist_videos = db.relationship("Video", backref="artist")
    artist_music = db.relationship("Music", backref="artist")

    saved_artist = db.relationship('Saved_Artist', backref='artist')

    followers = db.relationship('Follow_Artist', backref='artist')

    def __repr__(self):
        return f'<Artist {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
                # USER & ARTIST PROFILE PHOTO MODEL
class Profile_Photo(db.Model):
    __tablename__ = "profile_photo"
    
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), unique=True, nullable=True)

    def __repr__(self):
        return f"<ProfilePhoto id={self.id}, user_id={self.user_id}, artist_id={self.artist_id}, profile_photo={self.profile_photo}>"

    def serialize(self):
        return {
            "id": self.id,
            "is_active": self.is_active,
            "profile_photo": self.profile_photo,
            "user_id": self.user_id,
            "artist_id": self.artist_id
        }

                # ARTIST BIO MODEL
class Bio(db.Model):
    __tablename__ = "bio"

    id = db.Column(db.Integer, primary_key=True)

    text = db.Column(db.String(1000), nullable=True)

    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), nullable=False)

    def __repr__(self):
        shortened_text = self.text[:50] + '...' if self.text else "No bio available"
        return f'<Bio text={shortened_text}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "artist_id": self.artist_id
        }


                # ARTIST PHOTO MODEL
class Photo(db.Model):
    __tablename__ = "photo"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    media_url = db.Column(db.Text, nullable=False, unique=True)  # Cloudinary URL

    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), nullable=False)

    def __repr__(self):
        return f'<Photo {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "media_url": self.media_url
        }

                # ARTIST VIDEO MODEL
class Video(db.Model):
    __tablename__ = "video"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    media_url = db.Column(db.Text, nullable=False, unique=True)  # Cloudinary URL
    duration = db.Column(db.Integer, nullable=False)

    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), nullable=False)

    def __repr__(self):
        return f'<Video {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "media_url": self.media_url,
            "duration": self.duration,
        }

                # ARTIST MUSIC MODEL
class Music(db.Model):
    __tablename__ = "music"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    media_url = db.Column(db.Text, nullable=False, unique=True)  # Cloudinary URL
    duration = db.Column(db.Integer, nullable=False)

    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), nullable=False)

    def __repr__(self):
        return f'<Music {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "media_url": self.media_url,
            "duration": self.duration,
        }


                # USER SAVED MUSIC & SAVED ARTISTS MODEL
class Saved_Artist(db.Model):
    __tablename__ = "saved_artist"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"))

    def __repr__(self):
        return f'<Saved_Artist {self.artist_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "artist_id": self.artist_id
        }

class Saved_Music(db.Model):
    __tablename__ = "saved_music"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"))
    music_id = db.Column(db.Integer, db.ForeignKey("music.id"))

    def __repr__(self):
        return f'<Saved_Music {self.music_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "artist_id": self.artist_id,
            "music_id": self.music_id
        }
    

                # FOLLOW ARTIST MODEL
class Follow_Artist(db.Model):
    __tablename__ = "follow_artist"

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey("artist.id"), primary_key=True)

    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<Follow_Artist user_id={self.user_id}, artist_id={self.artist_id}, is_active={self.is_active}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "artist_id": self.artist_id,
            "is_active": self.is_active
        }