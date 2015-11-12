from flask import Flask, request, session, send_from_directory, render_template
from flask import Blueprint
import api, json

from api.common import WebSuccess, WebError
from api.annotations import api_wrapper, require_login, require_teacher, require_admin, check_csrf
from api.annotations import block_before_competition, block_after_competition
from api.annotations import log_action

blueprint = Blueprint("problem_api", __name__)

@blueprint.route('', methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def get_visible_problems_hook():
    return WebSuccess(data=api.problem.get_visible_problems(api.user.get_user()['tid']))

@blueprint.route('/unlocked', methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def get_unlocked_problems_hook():
    return WebSuccess(data=api.problem.get_unlocked_problems(api.user.get_user()['tid']))

@blueprint.route('/solved', methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def get_solved_problems_hook():
    solved_problems = api.problem.get_solved_problems(api.user.get_user()['tid'])

    for problem in solved_problems:
        problem.pop("instances")
        problem.pop("pkg_dependencies", None)

    return WebSuccess(data=solved_problems)

@blueprint.route('/submit', methods=['POST'])
@api_wrapper
@check_csrf
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
@block_after_competition(WebError("The competition is over!"))
def submit_key_hook():
    user_account = api.user.get_user()
    tid = user_account['tid']
    uid = user_account['uid']
    pid = request.form.get('pid', '')
    key = request.form.get('key', '')
    ip = request.remote_addr

    result = api.problem.submit_key(tid, pid, key, uid, ip)

    if result['correct']:
        return WebSuccess(result['message'], result['points'])
    else:
        return WebError(result['message'], {'code': 'wrong'})

@blueprint.route('/<path:pid>', methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
@block_after_competition(WebError("The competition is over!"))
def get_single_problem_hook(pid):
    problem_info = api.problem.get_problem(pid, tid=api.user.get_user()['tid'])
    return WebSuccess(data=problem_info)

@blueprint.route('/feedback', methods=['POST'])
@api_wrapper
@check_csrf
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def problem_feedback_hook():
    feedback = json.loads(request.form.get("feedback", ""))
    pid = request.form.get("pid", None)

    if feedback is None or pid is None:
        return WebError("Please supply a pid and feedback.")

    if not api.config.get_settings()["enable_feedback"]:
        return WebError("Problem feedback is not currently being accepted.")

    api.problem_feedback.add_problem_feedback(pid, api.auth.get_uid(), feedback)
    return WebSuccess("Your feedback has been accepted.")

@blueprint.route('/feedback/reviewed', methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def problem_reviews_hook():
    uid = api.user.get_user()['uid']
    return WebSuccess(data=api.problem_feedback.get_problem_feedback(uid=uid))

@blueprint.route("/hint", methods=['GET'])
@api_wrapper
@require_login
@block_before_competition(WebError("The competition has not begun yet!"))
def request_problem_hint_hook():

    @log_action
    def hint(pid, source):
        return None

    source = request.args.get("source")
    pid = request.args.get("pid")

    if pid is None:
        return WebError("Please supply a pid.")
    if source is None:
        return WebError("You have to supply the source of the hint.")

    tid = api.user.get_team()["tid"]
    if pid not in api.problem.get_unlocked_pids(tid):
        return WebError("Your team hasn't unlocked this problem yet!")

    hint(pid, source)
    return WebSuccess("Hint noted.")

@blueprint.route("/load_problems", methods=['POST'])
@api_wrapper
@require_login
@require_admin
def load_problems():
    data = json.loads(request.form.get("competition_data", ""))

    api.problem.load_published(data)
    return WebSuccess("Inserted {} problems.".format(len(data["problems"])))
