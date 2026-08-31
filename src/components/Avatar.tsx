type AvatarProps = {
    name: string;
    url?: string;
    size?: number;
}

const Avatar = ({ name, url, size = 40 }: AvatarProps) => {
    const getInitials = (name: string) => {
        const nameParts = name.trim().split(" ");
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return nameParts[0][0].toUpperCase();
    };

  return (
        <div
            className="flex items-center justify-center rounded-xl bg-neutral-200 text-primary font-medium"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size / 2}px`,
                backgroundColor: url ? "transparent" : "#E5E7EB",
            }}
            >
            {url ? (
                <img
                    src={url}
                    alt={name}
                    className="w-full h-full rounded-xl object-cover"
                />
            ) : (
                <span>{getInitials(name)}</span>
            )}
        </div>
    );
};

export default Avatar;
