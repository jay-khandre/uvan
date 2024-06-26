import YoutubeEmbed from "./youtube-embed";
import BlogContent from "./blog-content";
import OtherBlogs from "./other-blogs";
import { db } from "@/lib/db";

async function fetchBlog(id: string) {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function BlogPage({ id }: { id: string }) {
  const objectBlogs = await fetchBlog(id);
  const blogs = [objectBlogs];

  return (
    <>
      {blogs.map((blog: any) => (
        <div
          key={blog.id}
          className="flex border-2 h-full w-full py-4 px-8 gap-4"
        >
          <div className="blog-section bg-gray-50 w-full lg:w-[70%] h-full border-2 border-gray-200  rounded-2xl ">
            <div className="lg:h-[27rem]  ">
              <YoutubeEmbed videoURL={blog.youtubeLink} />
            </div>
            <div className="h-full lg:p-8 bg-gray-50">
              <h1 className="text-2xl sm:text-4xl font-bold p-3 ">
                {blog.title}
              </h1>
              <p className="text-sm sm:text-sm text-gray-500 p-3">
                {blog.category}
              </p>
              <hr />
              <section className="text-lg sm:text-2xl  p-3">
                <BlogContent content={JSON.parse(blog.content)} />
              </section>
            </div>
          </div>
          <div className="other-section w-[30%] p-1 space-y-4 h-full hidden lg:block">
            <div className="h-96">
              <OtherBlogs />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
