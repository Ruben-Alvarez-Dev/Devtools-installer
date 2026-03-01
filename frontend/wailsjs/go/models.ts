export namespace domain {
	
	export class Config {
	    version: string;
	    installDir: string;
	    shimsDir: string;
	    autoUpdate: boolean;
	    checkUpdates: boolean;
	    updateInterval: number;
	    customPath: string[];
	    preferredMethod: Record<string, string>;
	    theme: string;
	
	    static createFrom(source: any = {}) {
	        return new Config(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.version = source["version"];
	        this.installDir = source["installDir"];
	        this.shimsDir = source["shimsDir"];
	        this.autoUpdate = source["autoUpdate"];
	        this.checkUpdates = source["checkUpdates"];
	        this.updateInterval = source["updateInterval"];
	        this.customPath = source["customPath"];
	        this.preferredMethod = source["preferredMethod"];
	        this.theme = source["theme"];
	    }
	}
	export class InstallMethod {
	    type: string;
	    package?: string;
	    url?: string;
	    checksum?: string;
	    script?: string;
	    platform: string;
	    arch?: string;
	    env?: Record<string, string>;
	
	    static createFrom(source: any = {}) {
	        return new InstallMethod(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.package = source["package"];
	        this.url = source["url"];
	        this.checksum = source["checksum"];
	        this.script = source["script"];
	        this.platform = source["platform"];
	        this.arch = source["arch"];
	        this.env = source["env"];
	    }
	}
	export class InstalledVersion {
	    toolId: string;
	    version: string;
	    installPath: string;
	    installDate: string;
	    source: string;
	    active: boolean;
	
	    static createFrom(source: any = {}) {
	        return new InstalledVersion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.toolId = source["toolId"];
	        this.version = source["version"];
	        this.installPath = source["installPath"];
	        this.installDate = source["installDate"];
	        this.source = source["source"];
	        this.active = source["active"];
	    }
	}
	export class Tool {
	    id: string;
	    name: string;
	    description: string;
	    category: string;
	    icon?: string;
	    website?: string;
	    documentation?: string;
	    whySpecial?: string;
	    idealUse?: string;
	    configPath?: string;
	    installMethods: InstallMethod[];
	    tags?: string[];
	
	    static createFrom(source: any = {}) {
	        return new Tool(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.category = source["category"];
	        this.icon = source["icon"];
	        this.website = source["website"];
	        this.documentation = source["documentation"];
	        this.whySpecial = source["whySpecial"];
	        this.idealUse = source["idealUse"];
	        this.configPath = source["configPath"];
	        this.installMethods = this.convertValues(source["installMethods"], InstallMethod);
	        this.tags = source["tags"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ToolState {
	    toolId: string;
	    status: string;
	    installedVersion?: InstalledVersion;
	    updateAvailable: boolean;
	    latestVersion?: string;
	    lastError?: string;
	    lastChecked?: string;
	
	    static createFrom(source: any = {}) {
	        return new ToolState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.toolId = source["toolId"];
	        this.status = source["status"];
	        this.installedVersion = this.convertValues(source["installedVersion"], InstalledVersion);
	        this.updateAvailable = source["updateAvailable"];
	        this.latestVersion = source["latestVersion"];
	        this.lastError = source["lastError"];
	        this.lastChecked = source["lastChecked"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Version {
	    id: string;
	    toolId: string;
	    version: string;
	    changelog?: string;
	    url?: string;
	    checksum?: string;
	    date?: string;
	    latest?: boolean;
	    lts?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Version(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.toolId = source["toolId"];
	        this.version = source["version"];
	        this.changelog = source["changelog"];
	        this.url = source["url"];
	        this.checksum = source["checksum"];
	        this.date = source["date"];
	        this.latest = source["latest"];
	        this.lts = source["lts"];
	    }
	}

}

