from flask import Flask, request, session, send_from_directory, render_template
from flask import Blueprint
import api

from api.common import WebSuccess, WebError
from api.annotations import api_wrapper, require_login, require_teacher, require_admin, check_csrf
from api.annotations import block_before_competition, block_after_competition
from api.annotations import log_action

blueprint = Blueprint("team_api", __name__)

@blueprint.route('', methods=['GET'])
@api_wrapper
@require_login
def team_information_hook():
    return WebSuccess(data=api.team.get_team_information())

@blueprint.route('/score', methods=['GET'])
@api_wrapper
@require_login
def get_team_score_hook():
    score = api.stats.get_score(tid=api.user.get_user()['tid'])
    if score is not None:
        return WebSuccess(data={'score': score})
    return WebError("There was an error retrieving your score.")


@blueprint.route('/create', methods=['POST'])
@api_wrapper
@require_login
def create_new_team_hook():
    api.team.create_new_team_request(api.common.flat_multi(request.form))
    return WebSuccess("You now belong to your newly created team.")

@blueprint.route('/join', methods=['POST'])
@api_wrapper
@require_login
def join_team_hook():
    api.team.join_team_request(api.common.flat_multi(request.form))
    return WebSuccess("You have successfully joined that team!")

@blueprint.route("/settings")
@api_wrapper
def get_team_status():
    settings = api.config.get_settings()

    filtered_settings = {
        "max_team_size": settings["max_team_size"],
        "email_filter": settings["email_filter"]
    }

    return WebSuccess(data=filtered_settings)
