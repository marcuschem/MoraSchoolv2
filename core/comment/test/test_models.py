import pytest


from ...comment.models import Comment


@pytest.mark.django_db
def test_create_comment(user, post):
    comment = Comment.objects.create(
        commenter=user, post=post,
        body="Test Comment Body"
    )
    assert comment.commenter == user
    assert comment.post == post
    assert comment.body == "Test Comment Body"
    