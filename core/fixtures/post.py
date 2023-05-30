import pytest


from ..fixtures.user import user
from ..post.models import Post


@pytest.fixture
def post(db, user):
    return Post.objects.create(
        author=user,
        body="Test Post Body"
    )
