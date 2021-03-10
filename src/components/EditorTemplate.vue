<template>
    <table
        class="custom-event-editor"
        width="100%"
        cellpadding="5"
    >
        <tbody>
            <tr>
                <td class="e-textlabel">
                    Summary
                </td><td colspan="4">
                    <input
                        id="Subject"
                        class="e-field e-input"
                        type="text"
                        value=""
                        name="Subject"
                        style="width: 100%"
                    >
                </td>
            </tr><tr>
                <td class="e-textlabel">
                    Status
                </td><td colspan="4">
                    <input
                        id="EventType"
                        type="text"
                        name="EventType"
                        class="e-field"
                        style="width: 100%"
                    >
                </td>
            </tr><tr>
                <td class="e-textlabel">
                    From
                </td><td colspan="4">
                    <input
                        id="StartTime"
                        class="e-field"
                        type="text"
                        name="StartTime"
                    >
                </td>
            </tr><tr>
                <td class="e-textlabel">
                    To
                </td><td colspan="4">
                    <input
                        id="EndTime"
                        class="e-field"
                        type="text"
                        name="EndTime"
                    >
                </td>
            </tr><tr>
                <td class="e-textlabel">
                    Reason
                </td><td colspan="4">
                    <textarea
                        id="Description"
                        class="e-field e-input"
                        name="Description"
                        rows="3"
                        cols="50"
                        style="width: 100%; height: 60px !important; resize: vertical"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'EditorTemplate',
}
</script>

<style lang="scss" scoped>
</style>
