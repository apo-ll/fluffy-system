import { MainHeader } from '@/components/main-header'
import { Redis } from '@upstash/redis'


export const revalidate = 0 // disable cache

const redis = new Redis({
    url: 'https://us1-fast-chigger-39823.upstash.io',
    token: 'AZuPASQgODdmOTUxN2MtOTMzZS00OTRjLTk0ZGItYjM1OTEyOTlmMWY4MTc2OWE5ZmZjZGU2NDU0M2E3NDZlY2M0NWQyNTNlNDc=',
  })

export default async function Home() {
  const member = await redis.srandmember("nextjs13")

  return (
    <div className='text-white'>
      
      <MainHeader />
    </div>
  )
}