import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { getEnv } from "@/helpers/getEnv";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const RelatedBlog = ({ props }) => {
  const { data, loading, error } = useFetch(
    `https://blog-mjx4.onrender.com/api/blog/getrelatedblog/${props.category}/${props.currentBlog}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  // console.log(data);

  if (loading) return <Loading />;
  return (
    <div>
      <h2 className="text-2xl font-bold">Related Blogs</h2>
      <div>
        {data && data.relatedBlog.length > 0 ? (
          data.relatedBlog.map((blog) => {
            {/* console.log(blog) */}
            return (
              <Link
                key={blog._id}
                to={RouteBlogDetails(props.category, blog.slug)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <img
                    className="w-[100px] h-[70px] object-cover rounded-md"
                    src={blog.featuredImage}
                  />
                  <h4 className="line-clamp-2 text-lg font-semibold">
                    {blog.title}{" "}
                  </h4>
                </div>
              </Link>
            );
          })
        ) : (
          <div>No Realated Blog</div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
