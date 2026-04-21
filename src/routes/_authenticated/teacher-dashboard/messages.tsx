import { createFileRoute } from '@tanstack/react-router'
import { MessageSquare, Search, Send, Paperclip, MoreVertical } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/teacher-dashboard/messages')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Messages</h1>
        <p className='mt-2 text-gray-500'>Communicate with students and colleagues</p>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {/* Conversations List */}
        <div className='col-span-1 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
          <div className='mb-4 relative'>
            <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={18} />
            <input
              type='text'
              placeholder='Search messages...'
              className='w-full rounded-lg bg-gray-100 py-2 pr-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b80035]/20'
            />
          </div>
          <div className='space-y-2'>
            {[
              { name: 'Sarah Kim', message: 'Can you help me with the essay?', time: '2m ago', unread: true, color: 'bg-purple-500' },
              { name: 'Marc Lawson', message: 'Thanks for the feedback!', time: '1h ago', unread: false, color: 'bg-blue-500' },
              { name: 'Javier Delgado', message: 'When is the next class?', time: '3h ago', unread: true, color: 'bg-orange-500' },
              { name: 'Emily Chen', message: 'I submitted my homework', time: '1d ago', unread: false, color: 'bg-green-500' },
            ].map((conv, index) => (
              <button
                key={index}
                className={`w-full rounded-xl p-3 text-left transition-colors ${
                  index === 0 ? 'bg-[#fff0f3]' : 'hover:bg-gray-50'
                }`}
              >
                <div className='flex items-start gap-3'>
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${conv.color} text-sm font-semibold text-white`}>
                    {conv.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <span className='font-semibold text-gray-800'>{conv.name}</span>
                      <span className='text-xs text-gray-500'>{conv.time}</span>
                    </div>
                    <p className='mt-1 truncate text-sm text-gray-600'>{conv.message}</p>
                  </div>
                  {conv.unread && <div className='h-2 w-2 flex-shrink-0 rounded-full bg-[#b80035]' />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className='col-span-2 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(25,28,30,0.06)]'>
          <div className='mb-6 flex items-center justify-between border-b border-gray-200 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white'>
                SK
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>Sarah Kim</h3>
                <p className='text-xs text-gray-500'>Online</p>
              </div>
            </div>
            <button className='text-gray-400 hover:text-gray-600'>
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className='mb-4 space-y-4 max-h-96 overflow-y-auto'>
            <div className='flex justify-start'>
              <div className='rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3 max-w-md'>
                <p className='text-sm text-gray-800'>Hi teacher, can you help me with the essay assignment?</p>
                <p className='mt-1 text-xs text-gray-500'>2:30 PM</p>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='rounded-2xl rounded-tr-none bg-[#b80035] px-4 py-3 max-w-md'>
                <p className='text-sm text-white'>Of course! What specific part are you struggling with?</p>
                <p className='mt-1 text-xs text-white/80'>2:32 PM</p>
              </div>
            </div>
            <div className='flex justify-start'>
              <div className='rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3 max-w-md'>
                <p className='text-sm text-gray-800'>I'm having trouble with the thesis statement. Can you give me some tips?</p>
                <p className='mt-1 text-xs text-gray-500'>2:35 PM</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className='flex items-center gap-2 rounded-xl border border-gray-200 p-2'>
            <button className='rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100'>
              <Paperclip size={20} />
            </button>
            <input
              type='text'
              placeholder='Type a message...'
              className='flex-1 bg-transparent py-2 text-sm focus:outline-none'
            />
            <button className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b80035] to-[#e11d48] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg'>
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
