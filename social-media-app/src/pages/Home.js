import React from "react";
import Layout from "../components/Layout.js";
import {Row, Col, Image} from "react-bootstrap";
import {randomAvatar} from "../utils.js";
import useSWR from "swr";
import {fetcher} from "../helpers/axios.js";
import {getUser} from "../hooks/user.actions.js";
import CreatePost from "../components/posts/CreatePost.js";
import Post from "../components/posts/Post.js";

function Home(){
    const user = getUser();
    const posts = useSWR("/post/", fetcher, {
        refreshInterval: 10000,
    });

    if (!user){
        return <section>Loading!</section>
    }
    return(
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <Image
                                src={randomAvatar()}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            />
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                           <CreatePost refresh={posts.mutate}/>
                        </Col>
                    </Row>
                    <Row className="my-4">
                        {
                            posts.data?.results.map((post, index) => (
                                <Post key={index} post={post} refresh={post.mutate}/>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default Home;