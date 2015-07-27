module Ui {
    export class SelectTool implements IToolAction {
        onElementClick(element: Visual.SizableElement) {
            Application.instance.deselect();
            element.selected = true;
        }

        get imgUrl(): string {
            return "../Content/apps/complex/img/select.png";
        }
    }

    export class DeleteTool implements IToolAction {
        onElementClick(element: Visual.SizableElement) {
            element.delete();
        }

        get imgUrl(): string {
            return "../Content/apps/complex/img/delete.svg";
        }
    }

    export class ConnectTool implements IToolAction {
        private saved: Visual.SizableElement;

        onElementClick(element: Visual.SizableElement) {
            if (this.saved == null) {
                this.saved = element;
                return;
            }
            if (this.saved.isConnectedWith(element)) {
                return;
            }
            var connection = this.saved.connectWith(element);
            Application.instance.elements.add(connection);
        }

        get imgUrl(): string {
            return "../Content/apps/complex/img/connect.svg";
        }
    }
}