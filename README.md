# OnCall notifier

The OnCall notifier is one of the first production apps written in Wing.
It includes a scheduled query to PagerDuty, on a twice-a-day basis, when the onCall member changes, parsing and posting the response on a slack channel.

It's deployed to AWS via a github workflow, on each merge to main.
