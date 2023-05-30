import pytest


from ...fixtures.user import user
from ..models import Post


@pytest.mark.django_db
def test_create_user(user):
    post = Post.objects.create(author=user, body="Test Post Body")

    assert post.body == "Test Post Body"
    assert post.author == user

    
