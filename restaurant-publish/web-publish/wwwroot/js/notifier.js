

var RestaurantNotifier = function () {
    let _conn;
    let loggedInUserId = 0;
    let unreadNotificationCount = 0;
    let isAnyNewNotification = false;
    return {
        init() {

            this.BuildConnection();
            /* this.GetUserNotifications();*/
        },
        SetUserId(userId) {
            loggedInUserId = userId;
        },
        BuildConnection() {
            try {

                _conn = new signalR.HubConnectionBuilder().withUrl("/NotificationHub").configureLogging(signalR.LogLevel.Error).build();
                _conn.on("ReceiveNotification", (notification, hasError) => {

                    if (notification && loggedInUserId === notification.userId) {
                        this.HandleReceiveNotification(notification);
                    }

                });
                _conn.start().catch(function (err) {
                    console.log(err);
                });
            } catch (err) {
                console.log(err);
            }
        },
        HandleReceiveNotification(notification) {
            const { userId, subject, message,orderId } = notification;
            unreadNotificationCount++;
            toastr.info(message);
            isAnyNewNotification = true;
            this.AddNotification({
                Message: message,
                Date: this.CurrentDateTime(),
                OrderId: orderId
            }, false);
            this.SetCount();
        },
        //GetUserNotifications() {
        //    nexgen_base.GetWithUrl('/Notifications/GetNotifications', (response) => {

        //        if (response) {


        //            const { UnreadCount, Notifications } = response;
        //            unreadNotificationCount = UnreadCount;
        //            this.SetCount();
        //            if (UnreadCount > 0) {
        //                isAnyNewNotification = true;
        //            }
        //            if (Notifications && Notifications.length) {

        //                $.each(Notifications, (index, item) => {
        //                    this.AddNotification(item);
        //                });
        //            }
        //        }

        //    });
        //},
        SetCount() {

            if (unreadNotificationCount === 0) {
                $('#appNotificationsCounter').text('');
                $('#appNotificationsCounter').hide()
            }
            else {
                $('#appNotificationsCounter').text(unreadNotificationCount);
                $('#appNotificationsCounter').show()
            }

        },
        AddNotification(notification, append = true) {
            getOrderDetails(notification.OrderId);
        },
        CurrentDateTime() {
            return moment(new Date()).format('MM/DD/YYYY hh:mm A');
        },
        ReadAllNotifications() {
            if (isAnyNewNotification) {
                isAnyNewNotification = false;
                unreadNotificationCount = 0;
                this.SetCount();
                nexgen_base.ajaxPostMethod('/Notifications/ReadAllNotifications', {}, (response) => {

                });
            }

        }
    };
}();

