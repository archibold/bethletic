import Input from '@/app/ui/basic/input';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function loginForm() {

		return (<div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
		<Input placeholder="type email... "/>
		<Input placeholder="type password" type="password"/>
			<button className="text-right">Login</button>
			<Link className="text-right" href="/auth/register"><small>Register</small></Link>
	</div>)
}