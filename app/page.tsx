'use client'
import { CreatePost } from '@/components/feed/create-post'
import { PostCard } from '@/components/feed/post-card'
import { ProfileSidebar } from '@/components/feed/profile-sidebar'
import { SuggestionsSidebar } from '@/components/feed/suggestions-sidebar'

import { useAppSelector } from '@/store/hooks'


const Home = () => {
  const posts = useAppSelector((s) => s.posts.items)
  return (
    <div className='flex flex-col items-center gap-3 min-h-screen overflow-y-scroll w-full'>
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-[225px_1fr_300px]">
      <aside className="hidden lg:block">
        <ProfileSidebar />
      </aside>

      <section className="flex flex-col gap-2">
        <CreatePost />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      
    </div>
    </div>
  )
}

export default Home