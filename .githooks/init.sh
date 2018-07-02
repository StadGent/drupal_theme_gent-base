#!/bin/bash
#
# Make sure that the githooks is used by GIT to look for git hooks.
#
# Warning : this requires GIT version 2.9+.
#

# Set the path where the hooks are located.
echo "Set the git hooks directory to .githooks"
git config core.hooksPath .githooks
