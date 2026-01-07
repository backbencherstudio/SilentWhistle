import NotificationCard from "./NotificationCard";

const Notification = () => {
  const notificationData = {
    today: [
      {
        id: "n1",
        type: "message",
        user: {
          name: "Frank Edward",
          avatar: "/dashboard/user.png",
        },
        title: "Account or Login Issues",
        description:
          "The team has successfully completed Phase I of the Marketing Campaign project. All deliverables...",
        time: "2m ago",
        highlight: true,
      },
      {
        id: "n2",
        type: "message",
        user: {
          name: "Albert Dera",
          avatar: "/dashboard/user.png",
        },
        title: "Course or Enrollment Help",
        description:
          "The team has successfully completed Phase I of the Marketing Campaign project. All deliverables...",
        time: "10m ago",
        highlight: false,
      },
    ],
    yesterday: [
      {
        id: "n3",
        type: "system",
        icon: "echo",
        title: "Your idea was echoed",
        description: "Echoed your farmers market idea",
        time: "2m ago",
      },
      {
        id: "n4",
        type: "reaction",
        icon: "heart",
        title: "New reactions",
        description: "3 people reacted to your traffic concern",
        time: "2m ago",
      },
      {
        id: "n5",
        type: "reaction",
        icon: "heart",
        title: "New reactions",
        description: "3 people reacted to your traffic concern",
        time: "2m ago",
      },
    ],
  };

  return (
    <div className="text-white">
      <div className="mb-5">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2 mb-5">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Notifications Management
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Manage global notifications sent to users
          </div>
        </div>

        {/* Today */}
        <div className="mb-5">
          <h1 className="font-medium text-lg leading-[132%] -tracking-[1%] mb-3">
            Today
          </h1>
          <div className="space-y-3">
            {notificationData.today.map((item) => (
              <NotificationCard key={item.id} notification={item} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-medium">Yesterday</h2>
          <div className="space-y-3">
            {notificationData.yesterday.map((item) => (
              <NotificationCard key={item.id} notification={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
