import { Link } from "react-router-dom";
import type { Member } from "@/features/members/types";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";


type Props = {
    member: Member
}

export default function MemberView({ member }: Props) {

    return (
        <div className="m-3">
            <div className="flex gap-4 md:gap-16 p-2 bg-primary-50 border border-primary-200 rounded-md">
                <div className="w-full md:w-1/2 lg:w-1/3 flex items-start">
                    <img 
                        src={member.image} 
                        alt={member.full_name} 
                        className="w-16 h-16 lg:w-24 lg:h-24 rounded-md mr-3"
                    />

                    <div className="flex flex-col space-y-1 text-xs">
                        <span className="text-sm font-semibold">
                            {member.full_name}
                        </span>

                        <span>{member.position}</span>

                        <span className="capitalize">
                            {member.type}
                        </span>

                        <span>
                            Last update, {new Date(member.updated_at).toLocaleString()}
                        </span>
                    </div>
                </div>


                <div className="w-full md:w-1/2 lg:w-2/3 text-xs md:text-sm text-wrap line-clamp-6 space-y-4">
                    <p>
                        {member.quote === null ? "N/A" : member.quote }
                    </p>

                    <div className="flex items-center space-x-4">
                        {
                            member.linkedin && (
                                <Link to={member.linkedin} target="_blank">
                                    <IconBrandLinkedin className="w-5 h-5" />
                                </Link>
                            )
                        }
                        
                        {
                            member.facebook && (
                                <Link to={member.facebook} target="_blank">
                                    <IconBrandFacebook className="w-5 h-5" />
                                </Link>
                            )
                        }

                        {
                            member.twitter && (
                                <Link to={member.twitter} target="_blank">
                                    <IconBrandTwitter className="w-5 h-5" />
                                </Link>
                            )
                        }
                    </div> 
                </div>
            </div>
        </div>
    )
}