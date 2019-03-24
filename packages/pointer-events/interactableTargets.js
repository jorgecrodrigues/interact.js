import { merge } from '@interactjs/utils/arr';
import extend from '@interactjs/utils/extend';
import * as is from '@interactjs/utils/is';
function install(scope) {
    const { pointerEvents, actions, Interactable, interactables, } = scope;
    pointerEvents.signals.on('collect-targets', ({ targets, element, type, eventTarget }) => {
        scope.interactables.forEachMatch(element, (interactable) => {
            const eventable = interactable.events;
            const options = eventable.options;
            if (eventable.types[type] &&
                eventable.types[type].length &&
                is.element(element) &&
                interactable.testIgnoreAllow(options, element, eventTarget)) {
                targets.push({
                    element,
                    eventable,
                    props: { interactable },
                });
            }
        });
    });
    interactables.signals.on('new', ({ interactable }) => {
        interactable.events.getRect = function (element) {
            return interactable.getRect(element);
        };
    });
    interactables.signals.on('set', ({ interactable, options }) => {
        extend(interactable.events.options, pointerEvents.defaults);
        extend(interactable.events.options, options.pointerEvents || {});
    });
    merge(actions.eventTypes, pointerEvents.types);
    Interactable.prototype.pointerEvents = pointerEventsMethod;
    const __backCompatOption = Interactable.prototype._backCompatOption;
    Interactable.prototype._backCompatOption = function (optionName, newValue) {
        const ret = __backCompatOption.call(this, optionName, newValue);
        if (ret === this) {
            this.events.options[optionName] = newValue;
        }
        return ret;
    };
}
function pointerEventsMethod(options) {
    extend(this.events.options, options);
    return this;
}
export default {
    id: 'pointer-events/interactableTargets',
    install,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RhYmxlVGFyZ2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0YWJsZVRhcmdldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBQzdDLE9BQU8sTUFBTSxNQUFNLDBCQUEwQixDQUFBO0FBQzdDLE9BQU8sS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFVMUMsU0FBUyxPQUFPLENBQUUsS0FBWTtJQUM1QixNQUFNLEVBQ0osYUFBYSxFQUNiLE9BQU8sRUFDUCxZQUFZLEVBQ1osYUFBYSxHQUNkLEdBQUcsS0FBSyxDQUFBO0lBRVQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBTyxFQUFFLEVBQUU7UUFDM0YsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBMEIsRUFBRSxFQUFFO1lBQ3ZFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUE7WUFDckMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQTtZQUVqQyxJQUNFLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyQixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07Z0JBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNuQixZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1gsT0FBTztvQkFDUCxTQUFTO29CQUNULEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRTtpQkFDeEIsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFO1FBQ25ELFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsT0FBZ0I7WUFDdEQsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RDLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTlDLFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFBO0lBRTFELE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQTtJQUVuRSxZQUFZLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsVUFBVSxFQUFFLFFBQVE7UUFDdkUsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFL0QsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtTQUMzQztRQUVELE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQXNCLE9BQVk7SUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXBDLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUVELGVBQWU7SUFDYixFQUFFLEVBQUUsb0NBQW9DO0lBQ3hDLE9BQU87Q0FDUixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NvcGUgfSBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL3Njb3BlJ1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9hcnInXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2V4dGVuZCdcbmltcG9ydCAqIGFzIGlzIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2lzJ1xudHlwZSBJbnRlcmFjdGFibGUgPSBpbXBvcnQgKCdAaW50ZXJhY3Rqcy9jb3JlL0ludGVyYWN0YWJsZScpLmRlZmF1bHRcblxuZGVjbGFyZSBtb2R1bGUgJ0BpbnRlcmFjdGpzL2NvcmUvSW50ZXJhY3RhYmxlJyB7XG4gIGludGVyZmFjZSBJbnRlcmFjdGFibGUge1xuICAgIHBvaW50ZXJFdmVudHM6IHR5cGVvZiBwb2ludGVyRXZlbnRzTWV0aG9kXG4gICAgX19iYWNrQ29tcGF0T3B0aW9uOiAob3B0aW9uTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSA9PiBhbnlcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsIChzY29wZTogU2NvcGUpIHtcbiAgY29uc3Qge1xuICAgIHBvaW50ZXJFdmVudHMsXG4gICAgYWN0aW9ucyxcbiAgICBJbnRlcmFjdGFibGUsXG4gICAgaW50ZXJhY3RhYmxlcyxcbiAgfSA9IHNjb3BlXG5cbiAgcG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCdjb2xsZWN0LXRhcmdldHMnLCAoeyB0YXJnZXRzLCBlbGVtZW50LCB0eXBlLCBldmVudFRhcmdldCB9OiBhbnkpID0+IHtcbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCAoaW50ZXJhY3RhYmxlOiBJbnRlcmFjdGFibGUpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50YWJsZSA9IGludGVyYWN0YWJsZS5ldmVudHNcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBldmVudGFibGUub3B0aW9uc1xuXG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50YWJsZS50eXBlc1t0eXBlXSAmJlxuICAgICAgICBldmVudGFibGUudHlwZXNbdHlwZV0ubGVuZ3RoICYmXG4gICAgICAgIGlzLmVsZW1lbnQoZWxlbWVudCkgJiZcbiAgICAgICAgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhvcHRpb25zLCBlbGVtZW50LCBldmVudFRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0cy5wdXNoKHtcbiAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgIGV2ZW50YWJsZSxcbiAgICAgICAgICBwcm9wczogeyBpbnRlcmFjdGFibGUgfSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIGludGVyYWN0YWJsZXMuc2lnbmFscy5vbignbmV3JywgKHsgaW50ZXJhY3RhYmxlIH0pID0+IHtcbiAgICBpbnRlcmFjdGFibGUuZXZlbnRzLmdldFJlY3QgPSBmdW5jdGlvbiAoZWxlbWVudDogRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpXG4gICAgfVxuICB9KVxuXG4gIGludGVyYWN0YWJsZXMuc2lnbmFscy5vbignc2V0JywgKHsgaW50ZXJhY3RhYmxlLCBvcHRpb25zIH0pID0+IHtcbiAgICBleHRlbmQoaW50ZXJhY3RhYmxlLmV2ZW50cy5vcHRpb25zLCBwb2ludGVyRXZlbnRzLmRlZmF1bHRzKVxuICAgIGV4dGVuZChpbnRlcmFjdGFibGUuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMucG9pbnRlckV2ZW50cyB8fCB7fSlcbiAgfSlcblxuICBtZXJnZShhY3Rpb25zLmV2ZW50VHlwZXMsIHBvaW50ZXJFdmVudHMudHlwZXMpXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5wb2ludGVyRXZlbnRzID0gcG9pbnRlckV2ZW50c01ldGhvZFxuXG4gIGNvbnN0IF9fYmFja0NvbXBhdE9wdGlvbiA9IEludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb25cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLl9iYWNrQ29tcGF0T3B0aW9uID0gZnVuY3Rpb24gKG9wdGlvbk5hbWUsIG5ld1ZhbHVlKSB7XG4gICAgY29uc3QgcmV0ID0gX19iYWNrQ29tcGF0T3B0aW9uLmNhbGwodGhpcywgb3B0aW9uTmFtZSwgbmV3VmFsdWUpXG5cbiAgICBpZiAocmV0ID09PSB0aGlzKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vcHRpb25zW29wdGlvbk5hbWVdID0gbmV3VmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9pbnRlckV2ZW50c01ldGhvZCAodGhpczogSW50ZXJhY3RhYmxlLCBvcHRpb25zOiBhbnkpIHtcbiAgZXh0ZW5kKHRoaXMuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZDogJ3BvaW50ZXItZXZlbnRzL2ludGVyYWN0YWJsZVRhcmdldHMnLFxuICBpbnN0YWxsLFxufVxuIl19