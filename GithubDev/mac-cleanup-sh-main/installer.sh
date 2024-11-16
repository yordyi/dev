#!/usr/bin/env bash

# set -u will crash script on unset variables
set -Eeo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

usage() {
    cat <<EOF
Installer of Mac Cleanup (https://github.com/fwartner/mac-cleanup)

SYNOPSIS:
    $(basename "${BASH_SOURCE[0]}") [-h] [-v] install
    $(basename "${BASH_SOURCE[0]}") [-h] [-v] uninstall
    $(basename "${BASH_SOURCE[0]}") [-h] [-v] update

OPTIONS:
    -h, --help      Print this help and exit
    -v, --verbose   Print script debug info
EOF
    exit
}

cleanup() {
    trap - SIGINT SIGTERM ERR EXIT
    # script cleanup here
}

setup_colors() {
    if [[ -t 2 ]] && [[ -z "${NO_COLOR-}" ]] && [[ "${TERM-}" != "dumb" ]]; then
        NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
    else
        NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
    fi
}

msg() {
    echo >&2 -e "${1-}"
}

die() {
    local msg=$1
    local code=${2-1} # default exit status 1
    msg "$msg"
    exit "$code"
}

install() {
    msg "${BLUE}Download Mac Cleanup${NOFORMAT}"
    curl -o mac-cleanup https://raw.githubusercontent.com/mac-cleanup/mac-cleanup-sh/main/mac-cleanup
    msg "${BLUE}Init Mac Cleanup${NOFORMAT}"
    chmod +x mac-cleanup
    msg "${BLUE}Install Mac Cleanup${NOFORMAT}"
    sudo mv mac-cleanup /usr/local/bin/mac-cleanup
    msg "${GREEN}Done!${NOFORMAT}"
}

uninstall() {
    msg "${BLUE}Uninstall Mac Cleanup${NOFORMAT}"
    sudo rm /usr/local/bin/mac-cleanup
    msg "${GREEN}Done!${NOFORMAT}"
}

parse_params() {
    # default values of variables set from params
    flag=0
    param=''

    while :; do
        case "${1-}" in
        -h | --help) usage ;;
        -v | --verbose) set -x ;;
        --no-color) NO_COLOR=1 ;;
        uninstall) uninstall ;;
        update) install ;;
        install) install ;;
        -?*) die "Unknown option: $1" ;;
        *) break ;;
        esac
        shift
    done
    return 0
}

setup_colors
parse_params "$@"
