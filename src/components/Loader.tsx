
import { MutatingDots } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="w-full py-10 flex items-center justify-center">
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#000"
      secondaryColor="#000"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
  )
}
