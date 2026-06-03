#!/usr/bin/env bash
set -euo pipefail

BASE="http://127.0.0.1:3000"
TMP="$(mktemp -d)"
declare -a CREATED_IDS=()

cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

echo "base url: $BASE"

echo "1) creating new tasks..."
for i in 1 2 3; do
  description="Test task $i"
  body=$(curl -s --request POST -H "Content-Type: application/json" --data "{\"description\": \"$description\", \"done\": false}" "$BASE/tasks")
  id=$(echo "$body" | jq -r '.id')
  if [ -z "$id" ]; then
    echo "ERROR: could not read created record. response: $body"
    exit 1
  fi
  CREATED_IDS+=("$id")
  echo -e "\tcreated new task: \"$body\""
done

echo "2) making sure task list contains created tasks..."
raw_list=$(curl -s "$BASE/tasks")
ids_in_list=($(echo "$raw_list" | jq -r 'map(.id)[]' 2>/dev/null || true))
for id in "${CREATED_IDS[@]}"; do
  if ! printf '%s\n' "${ids_in_list[@]}" | grep -qx "$id"; then
    echo "ERROR: created task with $id is not found in list. full response:"
    echo "$raw_list"
    exit 1
  fi
done
echo -e "\tall created tasks are present in the list"

TO_UPDATE=${CREATED_IDS[-1]}
echo "3) updating task $TO_UPDATE..."
updated_task='{"description": "Updated description", "done": true}'
update_response=$(curl -s --request PATCH -H "Content-Type: application/json" --data "$updated_task" "$BASE/tasks/$TO_UPDATE")
echo -e "\tupdate response: $update_response"

sleep 0.1 # give it some time to update 🥹
echo "4) querying updated task $TO_UPDATE..."
updated_task_response=$(curl -s "$BASE/tasks/$TO_UPDATE")
got_description=$(echo "$updated_task_response" | jq -r '.description // empty')
got_done=$(echo "$updated_task_response" | jq -r '.done // empty')
if [ "$got_description" != "Updated description" ] || [ "$got_done" != "true" ]; then
  echo "ERROR: updated task does not match expectations."
  echo "expected: \"$updated_task\""
  echo "received: \"$updated_task_response\""
  exit 1
fi
echo -e "\tthe task was updated correctly"

echo "5) removing created tasks..."
for id in "${CREATED_IDS[@]}"; do
  curl -s --request DELETE "$BASE/tasks/$id" >/dev/null
  echo -e "\tdeleted task $id"
done

echo "6) making sure the removed tasks are removed..."
new_list=$(curl -s "$BASE/tasks")
remaining_ids=($(echo "$new_list" | jq -r 'map(.id)[]' 2>/dev/null || true))
for id in "${CREATED_IDS[@]}"; do
  if printf '%s\n' "${remaining_ids[@]}" | grep -qx "$id"; then
    echo "ERROR: task $id is still present in the list, but it should've been removed. full list:"
    echo "$new_list"
    exit 1
  fi
done
echo -e "\tthey are"

echo -e "\nALL CHECKS PASSED."
