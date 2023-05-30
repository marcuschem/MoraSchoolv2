from rest_framework import serializers
from rest_framework.exceptions import ValidationError


from ..abstract.serializers import AbstractSerializer
from ..user.models import User
from ..user.serializers import UserSerializer
from ..comment.models import Comment
from ..post.models import Post


class CommentSerializer(AbstractSerializer):
    commenter = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="public_id"
    )
    post = serializers.SlugRelatedField(
        queryset=Post.objects.all(),
        slug_field="public_id"
    )

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep["author"])
        rep["commenter"] = UserSerializer(author).data

        return rep

    class Meta:
        model = Comment
        fields = [
            "id", "post", "commenter", "body", "edited", "created", "updated"
        ]
        read_only_fields = ["edited"]

    def validate_post(self, value):
        if self.instance:
            return self.instance.post
        return value

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data["edited"] = True
        instance = super().update(
            instance, validated_data
        )
        return instance

