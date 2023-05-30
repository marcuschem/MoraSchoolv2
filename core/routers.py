from rest_framework_nested import routers
from .user.viewsets import UserViewSet
from .auth.viewsets import RegisterViewSet
from .post.viewsets import PostViewSet
from .comment.viewsets import CommentViewSet


router = routers.SimpleRouter()


router.register(r"user", UserViewSet, basename="user")
router.register(r"auth/register", RegisterViewSet, basename="auth-register")
router.register(r"post", PostViewSet, basename="post")

posts_router = routers.NestedSimpleRouter(router, r"post", lookup="post")
posts_router.register(r"comment", CommentViewSet, basename="post-comment")


urlpatterns = [
    *router.urls,
    *posts_router.urls,
]
