import uuid


from cloudinary_storage.storage import MediaCloudinaryStorage
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.http import Http404


class UserManager(BaseUserManager):

    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id=public_id)
            return instance
        except (ObjectDoesNotExist, TypeError, ValueError):
            return Http404

    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError("User must have an username...")
        if email is None:
            raise TypeError("User must have an email...")
        if password is None:
            raise TypeError("User must have a password...")

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, **kwargs):
        """Create and return a `User` with superuser (admin) permissions"""
        if password is None:
            raise TypeError("Superusers must have a password...")
        if email is None:
            raise TypeError("Superusers must have an email...")
        if username is None:
            raise TypeError("Superusers must have an username...")

        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    public_id = models.UUIDField(db_index=True, unique=True, default=uuid.uuid4, editable=False)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    bio = models.TextField()
    avatar = models.ImageField(
        upload_to='avatar/%Y/%m/%d/',
        storage=MediaCloudinaryStorage,
        validators=(FileExtensionValidator(
                allowed_extensions=("png", "jpeg", "jpg", "gif",)
            ),
        )
    )
    is_active = models.BooleanField(db_index=True, unique=True)
    is_superuser = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"